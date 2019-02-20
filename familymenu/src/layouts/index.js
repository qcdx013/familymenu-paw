import BasicLayout from './BasicLayout.js';
import LoginLayout from './LoginLayout.js';
import IngredientsLayout from './IngredientsLayout.js';

export default function(props) {
  if (props.location.pathname === '/login') {
    return <LoginLayout>{props.children}</LoginLayout>;
  }
  if (props.location.pathname === '/myingredients') {
    return <IngredientsLayout>{props.children}</IngredientsLayout>;
  }

  return <BasicLayout>{props.children}</BasicLayout>;
}
