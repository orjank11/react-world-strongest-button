import * as React from 'react';
import './Button.css';

type ButtonType = 'default' | 'primary' | 'danger' | 'dashed' | 'transparent';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface IDropdownProps {
  href: string;
  label: string;
  icon: string;
}

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isSuccess?: boolean;
  dropdown?: IDropdownProps[];
  modal?: React.ReactNode;
  size?: ButtonSize;
  type?: ButtonType;
  failure?: string | boolean;
}

interface IButtonState {
  isDropdown?: boolean;
  isLoading?: boolean;
  isModal?: boolean;
  isSubmitButton?: boolean;
  isSuccess?: boolean;
  isFailure?: boolean;
}

class App extends React.Component<IButtonProps, IButtonState> {
  constructor(props: IButtonProps) {
    super(props);

    const customProperties = {
      isDropdown: !!props.dropdown,
      isFailure: !!props.failure,
      isLoading: props.isLoading,
      isModal: !!props.modal,
      isSubmitButton: !!props.onSubmit,
      isSuccess: props.isSuccess,
    };

    this.setState({ ...customProperties });
  }

  public render() {
    return (
      <>
        <button onClick={this.messageRoot} className="wsb-button">
          {this.props.children}
        </button>
        {this.state && this.state.isModal && (
          <>
            <div className="wsb-modal__container">{this.props.modal}</div>
            <div className="wsb-modal__out-side" />
          </>
        )}
      </>
    );
  }

  private messageRoot = () => {
    document.getElementById('root')!.innerHTML = `<p>Hello</p> ${document.getElementById('root')!.innerHTML}`
  }
}

export default App;
