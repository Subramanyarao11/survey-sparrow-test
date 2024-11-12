import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  invokeSurveySparrow,
  onSurveyResponseListener,
} from 'surveysparrow-react-native-sdk';
const dummyItem = {
  id: '1',
  createdAt: new Date().toISOString(),
  internalName: 'Motivation Quote',
  quote:
    'Success is not final, failure is not fatal: it is the courage to continue that counts.',
  author: 'Winston Churchill',
};

function App(): React.JSX.Element {
  const handlePressItem = () => {
    invokeSurveySparrow({
      domain: 'feedback.cenomirewards.com',
      token: 'tt-27hoA',
      surveyType: 'classic',
    });
  };

  useEffect(() => {
    const sub = onSurveyResponseListener.addListener(
      'onSurveyResponse',
      (data: any) => {
        console.log(data);
      },
    );
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{dummyItem.internalName}</Text>
        </View>

        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>{dummyItem.quote}</Text>
          <Text style={styles.authorText}>{dummyItem.author}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePressItem}>
              <Text style={styles.buttonText}>Take Survey</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 32,
  },
  authorText: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#804cc9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
