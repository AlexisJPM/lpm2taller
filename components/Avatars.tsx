import { Image, View, useColorScheme } from "react-native";

interface Avatars {
  uri: string | null | undefined;
  size?: number;
}

export default function Avatar({ uri, size = 32 }: Avatars) {
  const deviceTheme = useColorScheme(); // Detecta si el celular está en modo light o dark
  
  const styles = { 
    height: size, 
    width: size, 
    borderRadius: size / 2 
  };

  // Definimos el color de fondo basándonos en el tema actual
  const backgroundColor = deviceTheme === 'dark' 
    ? "rgba(255,255,255,0.1)" 
    : "rgba(0,0,0,0.1)";

  if (uri) return <Image source={{ uri }} style={styles} />;

  return (
    <View
      style={[
        styles, 
        { backgroundColor } // Aplicamos el color aquí
      ]}
    />
  );
}