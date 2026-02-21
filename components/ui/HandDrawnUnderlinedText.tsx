import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Hand-drawn pencil-style underline component
export const HandDrawnUnderline = () => (
  <Svg
    width="100%"
    height={8}
    viewBox="0 0 200 8"
    preserveAspectRatio="none"
    style={{ position: 'absolute', bottom: 0, left: 0 }}
  >
    {/* Primary pencil stroke */}
    <Path
      d="M1 4.5 C8 3, 18 6, 28 4 C38 2, 52 6.5, 65 4.2 C78 2, 88 6, 102 3.8 C115 1.5, 128 6, 140 4 C153 2, 168 6.5, 180 4.2 C190 2.5, 196 5, 199 4"
      stroke="#222220"
      strokeWidth={2}
      strokeLinecap="round"
      fill="none"
      opacity={0.7}
    />
    {/* Secondary subtle stroke for authentic hand-drawn feel */}
    <Path
      d="M2 4.8 C12 6, 22 2.5, 35 4.5 C48 6.5, 58 2, 72 4.3 C86 6, 96 2.5, 110 4.5 C124 6.5, 138 2.5, 152 4.2 C166 6, 178 3, 192 4.5 L199 4.2"
      stroke="#222220"
      strokeWidth={1}
      strokeLinecap="round"
      fill="none"
      opacity={0.3}
    />
  </Svg>
);

// Bold text with a hand-drawn pencil underline decoration
export const HandDrawnUnderlinedText = ({ children }: { children: string }) => (
  <View style={{ position: 'relative', alignSelf: 'flex-start', paddingBottom: 4, opacity: 0.8 }}>
    <Text
      className="text-pinvocab-text text-lg text-left leading-relaxed"
      style={{ fontFamily: 'Roboto-Bold' }}
    >
      {children}
    </Text>
    <HandDrawnUnderline />
  </View>
);
