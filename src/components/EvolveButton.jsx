import { Button } from 'antd';
import PropTypes from 'prop-types';

export default function EvolveButton(props) {
  return <Button {...props}>{props.children}</Button>;
}

EvolveButton.propTypes = {
  children: PropTypes.node.isRequired,
};
