import {
  Badge,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartItemsCount } from '../../app/features/cart/cart.selectors.ts'
import { CartIcon } from '../icons/CartIcon.tsx'
import { useAppSelector } from '../../hooks/useAppState.ts'
import { nFormatter } from '../../utils/format.ts'

const CartButton = ({ cartItemsCount }: { cartItemsCount: number }) => {
  const isLoading = useAppSelector((state) => state.cart.loading === 'pending')

  return cartItemsCount ? (
    <Badge
      content={nFormatter(cartItemsCount)}
      color="primary"
      placement="bottom-left"
      size="lg"
    >
      <Button
        color="primary"
        as={Link}
        isLoading={isLoading}
        to="checkout"
        variant="flat"
        startContent={<CartIcon />}
      >
        Cart
      </Button>
    </Badge>
  ) : (
    <Button
      color="primary"
      as={Link}
      to="/checkout"
      variant="flat"
      startContent={<CartIcon />}
    >
      Cart
    </Button>
  )
}

export const Topbar = () => {
  const cartItemsCount = useSelector(selectCartItemsCount)

  return (
    <Navbar maxWidth="2xl" className="mb-12" position="sticky">
      <NavbarBrand>
        <Link className="font-bold text-inherit" to="/">
          Simple Shop
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <CartButton cartItemsCount={cartItemsCount} />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
