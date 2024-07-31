import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const SocialLogin = ({
  googleLogin,
  facebookLogin,
  instagramLogin,
  tiktokLogin,
  tumblrLogin,
}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <TouchableOpacity onPress={googleLogin}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('./assets/google-icon.png')} style={{ width: 40, height: 40 }} />
          <Text style={{ marginTop: 5 }}>Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={facebookLogin}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('./assets/facebook-icon.png')} style={{ width: 40, height: 40 }} />
          <Text style={{ marginTop: 5 }}>Facebook</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={instagramLogin}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('./assets/instagram-icon.png')} style={{ width: 40, height: 40 }} />
          <Text style={{ marginTop: 5 }}>Instagram</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={tiktokLogin}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('./assets/tiktok-icon.png')} style={{ width: 40, height: 40 }} />
          <Text style={{ marginTop: 5 }}>TikTok</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={tumblrLogin}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('./assets/tumblr-icon.png')} style={{ width: 40, height: 40 }} />
          <Text style={{ marginTop: 5 }}>Tumblr</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogin;