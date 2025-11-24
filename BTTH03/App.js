import { Provider } from "react-redux";
import { AppStackNavigator } from "./src/navigations/AppNavigator";
import { rootStoreReduxToolkit } from "./store/store";

export default function App() {
  return (
    <Provider store={rootStoreReduxToolkit}>
      <AppStackNavigator></AppStackNavigator>
    </Provider>
  );
}
