import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Video, Audio } from "expo-av";
import * as Linking from "expo-linking";

export default function SlideShow({
  items,
  width = Dimensions.get("window").width,
  style
}) {
  const renderItem = (item, index) => {
    <TouchableOpacity
      key={index}
      style={getStyle(style, "element")}
      onPress={() => Linking.openURL(item.src)}
    >
      {item.type == "image" && (
        <Image
          key={index}
          source={{ uri: item.src }}
          style={[{resizeMode: "cover", width:'100%', height:'100%'}, getStyle(style, type,item.name?? undefined )]}
        />
      )}
      {item.type == "video" && (
        <View key={index} style={[{width:'100%', height:'100%'},getStyle(style, type,item.name?? undefined )] }>
          {item.title && <Text>{item.title}</Text>}
        <Video
          key={index}
          source={{ uri: item.src }}
          style={[{ width: '100%', height: '100%' }, getStyle(style, `${type}-track`, item.name ?? undefined)]}
          useNativeControls
          resizeMode="cover"
          shouldPlay={false}
        />
        </View>
      )}
      {item.type == "audio" && (
        <View key={index} style={[{width:'100%', height:'100%'},getStyle(style, type,item.name?? undefined )] }>
          {item.title && <Text>{item.title}</Text>}
          <Audio.Sound
            source={{ uri: item.src }}
            style={[{ width: '100%', height: '100%' }, getStyle(style, `${type}-track`, item.name ?? undefined)]}
            shouldPlay={false}
            useNativeControls
          />
        </View>
      )}
      {item.type == "link" && (
        <View key={index} style={[{width:'100%', height:'100%'},getStyle(style, type,item.name?? undefined )] }>
            <Text>{item.src}</Text>
            {/* <Text style={styles.linkText}>{item.title ||"Apri il link"}</Text>
            <Text style={styles.linkUrl}>{item.src}</Text> */}
        </View>
      )}
      {item.type == "text" && (
        <Text key={index} style={[{width:'100%', height:'100%'},getStyle(style, type,item.name?? undefined )] }>
          {item.src}
        </Text>
      )}
    </TouchableOpacity>;
  };

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={[styles.container, { width, height }]}
    >
      {items.map((item, index) => renderItem(item, index))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  media: {
    resizeMode: "cover",
  },
  audioContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  linkPreview: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 10,
  },
  linkText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#007BFF",
    marginBottom: 5,
  },
  linkUrl: {
    fontSize: 14,
    color: "#333",
  },
});
