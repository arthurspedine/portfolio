'use client'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl'
import { useTheme } from 'next-themes'

interface ThreadsProps {
  customColor?: [number, number, number]
  amplitude?: number
  distance?: number
}

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`

// Helper function to convert CSS variable color to RGB array
const getCssVariableColor = (variable: string): [number, number, number] => {
  if (typeof window === 'undefined') return [1, 1, 1] // Default for SSR

  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()

  // Handle hex format
  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    if (hex.length === 3) {
      const r = Number.parseInt(hex[0] + hex[0], 16) / 255
      const g = Number.parseInt(hex[1] + hex[1], 16) / 255
      const b = Number.parseInt(hex[2] + hex[2], 16) / 255
      return [r, g, b]
    } else {
      const r = Number.parseInt(hex.substring(0, 2), 16) / 255
      const g = Number.parseInt(hex.substring(2, 4), 16) / 255
      const b = Number.parseInt(hex.substring(4, 6), 16) / 255
      return [r, g, b]
    }
  }

  // Handle rgb/rgba format
  if (color.startsWith('rgb')) {
    const values = color.match(/\d+/g)
    if (values && values.length >= 3) {
      return [
        Number.parseInt(values[0]) / 255,
        Number.parseInt(values[1]) / 255,
        Number.parseInt(values[2]) / 255,
      ]
    }
  }

  // Handle hsl format
  if (color.startsWith('hsl')) {
    const values = color.match(/\d+/g)
    if (values && values.length >= 3) {
      const h = Number.parseInt(values[0]) / 360
      const s = Number.parseInt(values[1]) / 100
      const l = Number.parseInt(values[2]) / 100

      // Convert HSL to RGB
      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs(((h * 6) % 2) - 1))
      const m = l - c / 2

      let r, g, b
      if (h < 1 / 6) {
        r = c
        g = x
        b = 0
      } else if (h < 2 / 6) {
        r = x
        g = c
        b = 0
      } else if (h < 3 / 6) {
        r = 0
        g = c
        b = x
      } else if (h < 4 / 6) {
        r = 0
        g = x
        b = c
      } else if (h < 5 / 6) {
        r = x
        g = 0
        b = c
      } else {
        r = c
        g = 0
        b = x
      }

      return [r + m, g + m, b + m]
    }
  }

  return [1, 1, 1] // Default fallback
}

export const Threads: React.FC<ThreadsProps> = ({
  customColor,
  amplitude = 1,
  distance = 0,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number>(0)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Make sure component is mounted to access CSS variables
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!containerRef.current || !mounted) return
    const container = containerRef.current

    // Determine the current theme
    const currentTheme = theme === 'system' ? systemTheme : theme

    // Get foreground color from CSS variables based on theme
    const themeColor =
      customColor ||
      getCssVariableColor(
        currentTheme === 'dark' ? '--foreground' : '--foreground'
      )

    const renderer = new Renderer({ alpha: true })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    container.appendChild(gl.canvas)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uColor: { value: new Color(...themeColor) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) }, // Fixed value since mouse interaction is disabled
      },
    })

    const mesh = new Mesh(gl, { geometry, program })

    function resize() {
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight)
      program.uniforms.iResolution.value.r = clientWidth
      program.uniforms.iResolution.value.g = clientHeight
      program.uniforms.iResolution.value.b = clientWidth / clientHeight
    }
    window.addEventListener('resize', resize)
    resize()

    // Mouse interaction removed as requested

    function update(t: number) {
      // Fixed mouse values at center (0.5, 0.5) since interaction is disabled
      program.uniforms.uMouse.value[0] = 0.5
      program.uniforms.uMouse.value[1] = 0.5

      program.uniforms.iTime.value = t * 0.001

      renderer.render({ scene: mesh })
      animationFrameId.current = requestAnimationFrame(update)
    }
    animationFrameId.current = requestAnimationFrame(update)

    // Theme change observer
    const observer = new MutationObserver(() => {
      const updatedThemeColor =
        customColor ||
        getCssVariableColor(
          document.documentElement.classList.contains('dark')
            ? '--foreground'
            : '--foreground'
        )
      program.uniforms.uColor.value = new Color(...updatedThemeColor)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current)
      window.removeEventListener('resize', resize)

      // No event listeners to remove as mouse interaction is disabled
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()

      observer.disconnect()
    }
  }, [customColor, amplitude, distance, theme, systemTheme, mounted])

  return (
    <div
      ref={containerRef}
      className='w-full h-screen absolute'
      aria-hidden='true'
      {...rest}
    />
  )
}
