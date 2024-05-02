import {ElementType, forwardRef, ReactNode} from 'react'
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicComponent.ts'
import clsx from "clsx";
import {numberWithCommas} from "../../utils/format.ts";

export interface ICurrencyProps {
  suffix?: string
  precision?: number
  children: number | string;
}

export type CurrencyProps<Component extends ElementType> =
  PolymorphicComponentPropsWithRef<Component, ICurrencyProps>

type CurrencyComponent = <Component extends ElementType = 'h1'>(
  props: CurrencyProps<Component>
) => ReactNode

export const Currency: CurrencyComponent = forwardRef(
  <Component extends ElementType = 'span'>(
    props: CurrencyProps<Component>,
    ref?: PolymorphicRef<Component>
  ) => {
    const {
      as: Component = 'span',
      className,
      suffix = '$',
      precision = 2,
      children,
      ...componentProps
    } = props;

    return (
      <Component {...componentProps} className={clsx("font-bold", className)} ref={ref}>
        <span>{numberWithCommas(Number(children).toFixed(precision))}</span><span>{suffix}</span>
      </Component>
    )
  }
)
