export default function WaveDivider({
  topColor = '#fff',
  bottomColor = '#F7F4EE',
  flip = false,
  height = 56,
}: {
  topColor?: string
  bottomColor?: string
  flip?: boolean
  height?: number
}) {
  return (
    <div
      style={{
        background: flip ? bottomColor : topColor,
        lineHeight: 0,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: `${height}px`,
          transform: flip ? 'scaleY(-1)' : 'none',
        }}
      >
        <path
          d="M0,28 C240,56 480,0 720,28 C900,48 1080,8 1260,28 C1350,38 1400,32 1440,28 L1440,56 L0,56 Z"
          fill={flip ? topColor : bottomColor}
        />
      </svg>
    </div>
  )
}
