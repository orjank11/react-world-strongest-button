import * as cn from 'classnames';
import * as React from 'react';
import * as request from 'superagent';

import './Button.css';
import Loading from './Loading';

type ButtonType = 'default' | 'primary' | 'danger' | 'dashed' | 'transparent';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface IDropdownProps {
  href?: string;
  label: string;
  icon?: any;

}

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isSuccess?: boolean;
  dropdown?: IDropdownProps[];
  modal?: React.ReactNode;
  size?: ButtonSize;
  type?: ButtonType;
  failure?: string | boolean;
  className?: string;
  fetch?: string;
}

interface IButtonState {
  exitDropdown: boolean;
  exitModal: boolean;
  isDropdown?: boolean;
  isDropdownOpen: boolean;
  isLoading?: boolean;
  isModal?: boolean;
  isModalOpen: boolean;
  isSubmitButton?: boolean;
  isSuccess?: boolean;
  isFailure?: boolean;
  isFocused?: boolean;
  isFetch?: boolean;

}

let elm: any;

class Button extends React.Component<IButtonProps, IButtonState> {
  constructor(props: IButtonProps) {
    super(props);
    console.log('props', props);

    const customProperties = {
      exitDropdown: false,
      isDropdown: !!props.dropdown,
      isDropdownOpen: false,
      isFailure: !!props.failure,
      isLoading: props.isLoading,
      isModal: !!props.modal,
      isModalOpen: false,
      exitModal: false,
      isSubmitButton: !!props.onSubmit,
      isSuccess: props.isSuccess,
      isFetch: !!props.fetch
    };

    this.state = { ...customProperties };
  }

  componentWillReceiveProps(newProps: IButtonProps) {
    if (newProps.isLoading) {
      this.setState({ isLoading: newProps.isLoading });
    }
    if (newProps.isSuccess) {
      this.setState({ isSuccess: newProps.isSuccess });
    }
    if (newProps.failure) {
      this.setState({ isFailure: !!newProps.failure });
    }
  }

  componentDidMount() {
    elm = document.getElementsByClassName('wsb-button');
  }

  public render() {
    const dropdownstyle = { width: elm && elm[0].clientWidth && `${elm[0].clientWidth}px` };
    return (
      <>
        <button
          onClick={this.clickedButton}
          className={cn(`wsb-button loading-button loading-options open-loading left ${this.props.className}`, {
            ...this.state,
          })}
          onFocus={this.focus}
          onBlur={this.blur}
        >
          {this.state.isLoading && (
            <Loading error={this.state.isFailure || false} success={this.state.isSuccess || false} />
          )}
          <span className="button-text">
            {this.props.children}
          </span>
          {this.state.isDropdown && (
            <svg id="dropdown-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.969 37">
              <defs />
              <path id="Arrow_" data-name="Arrow" className="cls-1" d="M714.651,1194.53a1.569,1.569,0,0,1-2.184,0,1.5,1.5,0,0,1,0-2.15L728.9,1176.2l-16.428-15.62a1.492,1.492,0,0,1,0-2.14,1.55,1.55,0,0,1,2.184,0l18.362,17.76Z"
                transform="translate(-712.031 -1158)" />
            </svg>
          )}
        </button>
        {this.state.isDropdownOpen && (
          <>
            <ul
              className={cn("wsb-dropdown-list", {
                'wsb-dropdown-list--exit': this.state.exitDropdown
              })}
              style={dropdownstyle}
            >
              {this.props.dropdown!.map((item) => {
                return (
                  <li className="wsb-dropdown__list-item">
                    {item.label}
                  </li>
                );
              })}
            </ul>
            <div
              className="wsb-dropdown__out-side"
              onClick={() => this.handleDropdown(false)}
            />
          </>
        )}
        {this.state.isModalOpen && (
          <>
            <div
              className={cn("wsb-modal__container", {
                'wsb-modal__container--exit': this.state.exitModal
              })}
            >
              {this.props.modal}
            </div>
            <div
              className={cn("wsb-modal__out-side", {
                'wsb-modal__out-side--exit': this.state.exitModal
              })}
              onClick={() => this.handleModal(false)}
            />
          </>
        )}
      </>
    );
  }

  private blur = (event: any) => {
    this.setState({ isFocused: true });
    if (this.props && this.props.onBlur) {
      return this.props.onBlur(event);
    }
  }

  private focus = (foo: React.FocusEvent<HTMLButtonElement>) => {
    this.setState({ isFocused: true });
    if (this.props && this.props.onFocus) {
      return this.props.onFocus(foo);
    }
  }

  private clickedButton = (event: any) => {
    if (this.state.isDropdown) {
      return this.handleDropdown(true);
    }
    if (this.state.isModal) {
      return this.handleModal(true);
    }
    if (this.state.isFetch) {
      return this.handleFetch()
    }
    if (this.props && this.props.onClick && event) {
      return this.props.onClick(event);
    }
  }

  private handleFetch = () => {
    this.setState({ isLoading: true });
    console.log('handle fetch?');

    setTimeout(() => {
      request
        .get(this.props.fetch!)
        .end((err: any, res: any) => {
          if (err) {
            this.setState({ isFailure: true });
          }
        })
    }, 2000);
  }

  private handleDropdown = (open: boolean) => {
    if (!open) {
      this.setState({ exitDropdown: true }, () => {
        setTimeout(() => {
          this.setState({ isDropdownOpen: open, exitDropdown: false });
        }, 500);
      })
      return;
    }
    this.setState({ isDropdownOpen: open });
  }

  private handleModal = (open: boolean) => {
    if (!open) {
      this.setState({ exitModal: true }, () => {
        setTimeout(() => {
          this.setState({ isModalOpen: open, exitModal: false });
        }, 500);
      })
      return;
    }
    this.setState({ isModalOpen: open });
  }

  // private messageRoot = (message: string) => {
  //   document.getElementById('root')!.innerHTML = `<div className="wsb-popup">${message}</div> ${document.getElementById('root')!.innerHTML}`
  // }
}

export default Button;
