import { Link, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from './../style/styles';

export default function ErrorScreen(props: { errorCode: number, errorMessage: string, errorInfo: string, errorStack: string, errorComponentStack: string, links:Array<{path: string , text:string}>}  ) {
  return (
    <>
      <Stack.Screen options={{ title: 'Error!' }} />
      <ThemedView style={styles.container}>
        {/* <ThemedText type="title">This screen doesn't exist.</ThemedText> */}
       { props.links.map(link => {
       return < >
       ----- {link.path}
        {//   <Link href="/" style={styles.link}>
        //   <ThemedText type="link">{link.}}</ThemedText>
        // </Link>}
        }
        </>
       })}
      </ThemedView>

    </>
  );
}
