import { Link, Stack } from 'expo-router';
import { Text } from '@/components/Text';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '../style/styles';

export default function ErrorScreen(props: { errorCode: number, errorMessage: string, errorInfo: string, errorStack: string, errorComponentStack: string, links: Array<{ id: string, path: string, text: string }> }) {
  return (
    <>
      <Stack.Screen options={{ title: 'Error!' }} />
      <ThemedView style={styles.container}>
        <Text type="title">{props.errorMessage}</Text>
        {
          props.links.map((link, index) => {
            return <>
              <Link key={link.id} href={link.path} style={styles.link}>
                <Text type="link">{link.text}</Text>
              </Link>
            </>
          })
        }
      </ThemedView>
    </>
  );
}
