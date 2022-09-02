import { Container, interfaces } from 'inversify';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { configureComponentScope } from './component.scope';

let container: Container;

function setContainer(iocContainer: Container): void {
  container = iocContainer;
}

export interface IBLoC<TProps = unknown, TParams = unknown> {
  onParamsChange(props: TProps, params: TParams): void;

  onRequestClose?(): boolean;
  onDestroy?(): void;
}

export interface IWizardable {
  wizardId: string;
}

function useBLoC<T extends IBLoC<TProps>, TProps extends Record<string, any>>(
  ctor: interfaces.Newable<T>,
  props: TProps
): T {
  const [bloc] = useState(() => {
    const blocContainer = configureComponentScope(container, props);
    return blocContainer.resolve(ctor);
  });

  useLayoutEffect(() => {
    const { route: { params = {} } = {}, ...otherProps } = props;

    bloc.onParamsChange(otherProps as TProps, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bloc, props, ...Object.values(props)]);

  useEffect(() => {
    return () => bloc.onDestroy?.();
  }, [bloc]);

  const { navigation } = props;
  useEffect(() => {
    if (!navigation) {
      return;
    }

    const onScreenRemove = (e: React.SyntheticEvent) => {
      if (bloc.onRequestClose && !bloc.onRequestClose()) {
        e.preventDefault();
      }
    };

    navigation.addListener('beforeRemove', onScreenRemove);
    return () => navigation.removeListener('beforeRemove', onScreenRemove);
  }, [bloc, navigation]);

  return bloc;
}

const ioc = {
  setContainer,
  useBLoC,
};

export default ioc;
