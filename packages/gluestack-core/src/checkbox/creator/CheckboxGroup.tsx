import React, { createContext, forwardRef } from 'react';
import { useCheckboxGroup } from '../aria';
import { useCheckboxGroupState } from '@react-stately/checkbox';
import { useFormControlContext } from '../../form-control/creator';
export const CheckboxGroupContext = createContext<any>(null);

const CheckboxGroup = (StyledCheckboxGroup: any) =>
  forwardRef(({ children, ...props }: any, ref?: any) => {
    const state = useCheckboxGroupState({
      ...props,
      validationState: props.isInvalid ? 'invalid' : 'valid',
    });

    const formControlContext = useFormControlContext();
    const stateWithForm = { ...formControlContext, ...state };

    const { groupProps } = useCheckboxGroup(
      {
        ...props,
        'aria-label': props['aria-label'],
      },
      //@ts-ignore
      stateWithForm
    );

    return (
      <CheckboxGroupContext.Provider
        value={{ state: stateWithForm }}
      >
        <StyledCheckboxGroup {...groupProps} {...props} ref={ref}>
          {children}
        </StyledCheckboxGroup>
      </CheckboxGroupContext.Provider>
    );
  });

export default CheckboxGroup;
