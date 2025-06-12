import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Magic } from '@magic-sdk/react-native-expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const magic = new Magic(process.env.EXPO_PUBLIC_MAGIC_PUBLIC_KEY ?? '');

export default function App() {
	const [isLoading, setIsLoading] = React.useState(false);

	const testMagicSDK = async () => {
		setIsLoading(true);
		console.log('🔧 Testing Magic SDK...');

		try {
			console.log('✅ Magic SDK initialized');
			console.log('🔍 Calling magic.user.isLoggedIn()...');

			// This call hangs indefinitely on RN 0.79
			const startTime = Date.now();
			const isLoggedIn = await magic.user.isLoggedIn();
			const duration = Date.now() - startTime;

			console.log(
				`✅ magic.user.isLoggedIn() completed in ${duration}ms:`,
				isLoggedIn
			);
			Alert.alert('Success', `Magic SDK working! Result: ${isLoggedIn}`);
		} catch (error) {
			console.error('❌ Magic SDK error:', error);
			Alert.alert('Error', `Magic SDK failed: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaProvider>
			<magic.Relayer />

			<View style={styles.container}>
				<Text style={styles.title}>Magic SDK Test</Text>
				<Text style={styles.subtitle}>Expo SDK 53 + RN 0.79 Compatibility</Text>

				<Button
					title={isLoading ? 'Testing...' : 'Test Magic SDK'}
					onPress={testMagicSDK}
					disabled={isLoading}
				/>

				<Text style={styles.instructions}>
					Check console logs for detailed output
				</Text>
			</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		color: '#666',
		marginBottom: 30,
	},
	instructions: {
		marginTop: 20,
		textAlign: 'center',
		color: '#888',
	},
});
