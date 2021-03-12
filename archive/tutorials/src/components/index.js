/** @jsx jsx */

/**
 * This file contains low-level components to use in demo projects and tutorials for `state-designer`.
 * Because those demos are focused on state management, rather than presentation and styling, these
 * components wrap lower-level components and provide default props that would normally be given inline.
 * A regular project would not include this layer of abstraction.
 *
 */

import { jsx } from "@emotion/core"

import * as React from "react"

import { motion } from "framer-motion"
import { useLocation, Link } from "react-router-dom"
import { keyframes } from "@emotion/core"
import theme from "theme"
import {
  Box,
  Button,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox as Cb,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Text,
  Image,
  Input,
  Stack,
  Switch,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  PseudoBox,
  Progress,
  Link as CLink,
  css,
} from "@chakra-ui/core"
import routes from "routes"

// Helper function to provide default props to low-level components

const withDefaultProps = (C, defaults = {}) => (props) => {
  const { colorMode } = useColorMode()
  const p = { ...props, colorMode }
  const d = typeof defaults === "function" ? defaults(p) : defaults
  if (d.ariaLabel !== undefined) d["aria-label"] = d.ariaLabel
  return <C {...d} {...p} style={{ ...d.style, ...p.style }} />
}

// Generic

export const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Stack align="center" justify="center" isInline spacing={2}>
      <Icon name="sun" size={5} />
      <Switch
        isChecked={colorMode === "light"}
        onChange={toggleColorMode}
        h={5}
      />
    </Stack>
  )
}

export const Lockup = withDefaultProps(Image, (p) => ({
  src: p.colorMode === "dark" ? "lockup-light.svg" : "lockup-dark.svg",
  h: 4,
}))

export const NavLinks = () => {
  const { pathname } = useLocation()
  return (
    <Grid
      templateColumns="min-content 1fr"
      autoFlow="column"
      columnGap={4}
      rowGap={[4, 2]}
    >
      {routes.map(({ name }, i) => {
        const isStarterActive = pathname === `/${name}-starter`
        const isCompleteActive = pathname === `/${name}-complete`
        return [
          <Text gridColumn={1} key={i + "t"}>
            <b>{name}</b>
          </Text>,
          <HStack gridColumn={2} w="fit-content" key={i + "h"}>
            <CLink
              to={`/${name}-starter`}
              as={Link}
              textDecor={isStarterActive ? "underline" : "inherit"}
            >
              starter
            </CLink>
            /
            <CLink
              to={`/${name}-complete`}
              as={Link}
              textDecor={isCompleteActive ? "underline" : "inherit"}
            >
              complete
            </CLink>
          </HStack>,
        ]
      })}
    </Grid>
  )
}

export const TitleBar = () => {
  const { pathname } = useLocation()
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  return (
    <Box>
      <Flex
        mb={4}
        px={[0, 1, 4]}
        py={3}
        position="sticky"
        align="center"
        justify="space-between"
        top={0}
        bg={colorMode === "dark" ? "gray.800" : "#fff"}
        zIndex="999"
      >
        <Flex align="center">
          <Button
            ref={btnRef}
            variantColor="blue"
            onClick={onOpen}
            size="md"
            variant="link"
            lineHeight="1"
            m={0}
          >
            tutorials/
          </Button>
          <Heading as="h1" mt={1} size={"s"} lineHeight="1" m={0}>
            {pathname.slice(1)}
          </Heading>
        </Flex>
        <ColorModeSwitch />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tutorials</DrawerHeader>

          <DrawerBody>
            <CLink to={"/"} as={Link}>
              Home
            </CLink>
            <Divider />
            <NavLinks />
          </DrawerBody>
          <DrawerFooter>
            <CLink href="https://state-designer.com" />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export function Footer() {
  return (
    <VStack w="100%" justifyItems="center" textAlign="center" mt={40} mb={20}>
      <CLink isExternal href="https://state-designer.com/" ml={1}>
        <Lockup />
      </CLink>
      <HStack w="fit-content" alignItems="center" justifySelf="center" gap={2}>
        <CLink isExternal href="https://state-designer.com/" ml={1}>
          Docs
          <Icon name="external-link" mb={"3px"} mx={2} opacity={0.5} />
        </CLink>
        <CLink isExternal href="https://github.com/steveruizok/state-designer">
          Github
          <Icon name="external-link" mb={"3px"} ml={2} mr={0} opacity={0.5} />
        </CLink>
      </HStack>
      <VStack opacity={0.5} textAlign="center" justifyContent="center" gap={0}>
        <Text fontSize="sm">Copyright © 2020 </Text>
        <CLink fontSize="sm" isExternal href="https://twitter.com/steveruizok">
          Steve Ruiz
        </CLink>
      </VStack>
    </VStack>
  )
}

// Tutorials

export const Layout = withDefaultProps(Grid, (p) => ({
  ariaLabel: "container",
  p: 4,
  borderRadius: 8,
  width: "fit-content",
  maxWidth: 700,
  margin: "0 auto",
  boxShadow: "0 4px 12px -4px rgba(0,0,5,.05)",
  borderWidth: 1,
  borderStyle: "solid",
  autoRows: "min-content",
  borderColor: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.200",
  bg: p.colorMode === "dark" ? "whiteAlpha.100" : "gray.50",
  overflow: "hidden",
}))

export const TightLayout = withDefaultProps(Layout, {
  width: "260px",
  alignItems: "center",
  my: 10,
})

export const TwoColumnLayout = withDefaultProps(Layout, (p) => ({
  templateColumns: "auto 1fr",
  columnGap: 5,
}))

export const HStack = withDefaultProps(Grid, (p) => ({
  gridAutoFlow: "column",
  templateRows: "1fr",
  alignItems: "center",
  width: "fit-content",
  gridGap: p.gap === undefined ? 2 : p.gap,
}))

export const VStack = withDefaultProps(Grid, (p) => ({
  gridAutoFlow: "row",
  templateColumns: "1fr",
  autoRows: "min-content",
  alignItems: "flex-start",
  height: "fit-content",
  justifyContent: p.justify || "center",
  gridGap: p.gap === undefined ? 2 : p.gap,
}))

export const PrimaryButton = withDefaultProps(Button, {
  variantColor: "blue",
})

export const NavButton = withDefaultProps(Button, (p) => ({
  variant: "ghost",
  style: { textDecoration: p.active ? "underline" : "none" },
}))

export const Value = withDefaultProps(Heading, {
  m: 0,
  p: 0,
  maxWidth: "100%",
  overflow: "hidden",
  lineHeight: 1,
  textAlign: "center",
})

/* ---------------------- Todo ---------------------- */

export const TodoContainer = withDefaultProps(Grid, {
  templateColumns: "32px 1fr",
  gap: 2,
  alignItems: "center",
})

export const RemoveButton = withDefaultProps(IconButton, {
  variant: "ghost",
  size: "sm",
  ariaLabel: "Remove Todo",
  icon: "close",
  color: "blue.500",
})

export const Checkbox = (props) => {
  return (
    <Flex align="center" justify="center">
      <Cb
        size="lg"
        borderColor="blue.500"
        opacity={props.disabled ? 0.5 : 1}
        {...props}
      />
    </Flex>
  )
}

export const TextInput = withDefaultProps(Input, {
  ariaLabel: "input",
  h: 10,
})

/* --------------------- Counter -------------------- */

export const CounterLayout = withDefaultProps(TightLayout, {
  templateColumns: "min-content 1fr min-content",
  alignItems: "center",
})

export const Count = withDefaultProps(Value, { ariaLabel: "count" })

export const PlusButton = withDefaultProps(IconButton, {
  ariaLabel: "increase",
  icon: "add",
  variantColor: "blue",
})

export const MinusButton = withDefaultProps(IconButton, {
  ariaLabel: "decrease",
  icon: "minus",
  variantColor: "blue",
})

/* --------------------- Toggle --------------------- */

export const ToggleLayout = withDefaultProps(TightLayout, {
  textAlign: "center",
  gap: 3,
})

export const Toggle = withDefaultProps(Switch, (p) => ({
  isChecked: p.isToggled,
  size: "lg",
  ariaLabel: "toggle",
}))

export const Label = withDefaultProps(Heading, {
  m: 0,
  as: "h2",
  size: "md",
  p: 0,
  lineHeight: 1,
  textAlign: "center",
  ariaLabel: "label",
})

/* ---------------------- Input --------------------- */

export const InputLayout = withDefaultProps(TightLayout, {
  width: "320px",
  textAlign: "center",
  autoRows: "min-content",
  rowGap: 4,
})

export function TextInputWithLabel(props) {
  const { label, ...rest } = props
  return (
    <HStack templateColumns="64px 1fr" textAlign="left" gap={4} width="100%">
      <span aria-label={label + "-label"}>{label}</span>
      <TextInput aria-label={label + "-input"} {...rest} />
    </HStack>
  )
}

export const NameInput = withDefaultProps(TextInputWithLabel, {
  label: "Name",
})

export const TitleInput = withDefaultProps(TextInputWithLabel, {
  label: "Title",
})

export const InputRow = withDefaultProps(HStack, {
  templateColumns: "64px 1fr",
  textAlign: "left",
  gap: 4,
  width: "100%",
})

export const NameHeading = withDefaultProps(Heading, {
  ariaLabel: "Name-heading",
})

export const TitleHeading = withDefaultProps(Heading, {
  size: "sm",
  mb: 3,
  ariaLabel: "Title-heading",
})

export const ClearButton = withDefaultProps(Button, {
  ariaLabel: "Clear",
  children: "Clear",
})

/* -------------------- Stopwatch ------------------- */

export const StopwatchLayout = withDefaultProps(TightLayout, {
  templateColumns: "1fr 1fr min-content",
  width: "260px",
  autoRows: "min-content",
  columnGap: 2,
  rowGap: 4,
})

export const Time = withDefaultProps(Heading, (p) => ({
  as: "h2",
  size: "2xl",
  gridColumn: "span 4",
  textAlign: "center",
  fontFamily: "mono",
  animation: p.blinking ? `${blink} 1s ease infinite` : `none`,
  ariaLabel: "Time",
}))

export const StartButton = withDefaultProps(Button, {
  children: "START",
  ariaLabel: "start-button",
})

export const StopButton = withDefaultProps(Button, {
  children: "STOP",
  ariaLabel: "stop-button",
})

export const ResetButton = withDefaultProps(IconButton, {
  icon: "repeat-clock",
  ariaLabel: "reset-button",
})

/* ---------------------- Timer --------------------- */

const blink = keyframes`{
	0% {
		opacity: 1;
	}
	50% {
		opacity: 1;
	}
	51% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}`

export const TimerLayout = withDefaultProps(TightLayout, {
  templateColumns: "1fr 1fr 1fr min-content",
  width: "320px",
  autoRows: "min-content",
  columnGap: 2,
  rowGap: 4,
})

export const MinuteButton = withDefaultProps(Button, {
  children: "Min",
  ariaLabel: "minute-button",
})

export const SecondButton = withDefaultProps(Button, {
  children: "Sec",
  ariaLabel: "second-button",
})

export const StartStopButton = withDefaultProps(Button, {
  ariaLabel: "start-stop-button",
})

// ResetButton from Stopwatch

/* ---------------------- Tiles --------------------- */

export const TileLayout = withDefaultProps(Layout, {
  gap: 4,
})

export const TileGrid = withDefaultProps(Grid, (p) => ({
  height: "320px",
  width: "320px",
  templateColumns: "repeat(4, 1fr)",
  templateRows: "repeat(4, 1fr)",
  backgroundImage: `url(${p.image})`,
  backgroundSize: "600% center",
}))

export const Tile = withDefaultProps(Box, ({ tile, highlight }) => ({
  height: "100%",
  width: "100%",
  backgroundImage: "inherit",
  backgroundSize: "600% center",
  backgroundPosition: `${(tile % 4) * -100}% ${Math.floor(tile / 4) * -100}%`,
  css: css({
    filter: highlight ? "brightness(1.1)" : "brightness(1)",
  }),
  userSelect: "none",
}))

export const PlayButton = withDefaultProps(Button, (p) => ({
  variantColor: p.highlight ? "blue" : undefined,
}))

/* --------------------- Tetris --------------------- */

const Cell = withDefaultProps(Box, (p) => {
  return {
    height: "100%",
    width: "100%",
    gridColumn: p.x + 1,
    gridRow: p.y + 1,
    bg: p.color,
  }
})

const Piece = ({ tetrominos, color, x, y, ...p }) => {
  return [
    ...tetrominos
      .filter((point) => y + point.y >= 0)
      .map((point, i) => {
        return <Cell key={i} color={color} x={x + point.x} y={y + point.y} />
      }),
  ]
}

export const Tetris = {
  Layout: withDefaultProps(Layout, () => ({
    gridGap: 4,
    templateColumns: "auto auto",
  })),
  NextField: withDefaultProps(Grid, (p) => ({
    templateColumns: "repeat(4, 16px)",
    autoRows: "16px",
    gridGap: "0px",
  })),
  PlayField: withDefaultProps(Grid, (p) => ({
    position: "relative",
    width: 240,
    height: 480,
    bg: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
  })),
  Cell,
  Piece,
  GhostPiece: withDefaultProps(Piece, (p) => ({
    color: p.colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200",
  })),
  Layer: withDefaultProps(Grid, (p) => ({
    position: "absolute",
    top: 0,
    left: 0,
    templateColumns: "repeat(10, 24px)",
    templateRows: "repeat(20, 24px)",
    gridGap: "0px",
    bg: "transparent",
  })),
  Label: withDefaultProps(Text, (p) => {
    return {
      textAlign: "left",
      display: "inline",
      fontWeight: "bold",
    }
  }),
  Stats: withDefaultProps(Grid, (p) => {
    return {
      textAlign: "right",
      templateColumns: "min-content 1fr",
    }
  }),
  Button: withDefaultProps(Button, (p) => ({
    gridColumn: 1,
    variantColor: p.highlight ? "blue" : "gray",
  })),
}

/* ---------------------- Snake --------------------- */

export const Snake = {
  Layout: withDefaultProps(Layout, () => ({
    gridGap: 4,
  })),
  PlayField: withDefaultProps(Grid, (p) => ({
    position: "relative",
    width: 320,
    height: 320,
    bg: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
  })),
  Layer: withDefaultProps(Grid, (p) => ({
    position: "absolute",
    top: 0,
    left: 0,
    templateColumns: "repeat(20, 16px)",
    templateRows: "repeat(20, 16px)",
    gridGap: "0px",
    bg: "transparent",
  })),
  Cell: withDefaultProps(Box, (p) => ({
    height: "100%",
    width: "100%",
    gridColumn: p.x + 1,
    gridRow: p.y + 1,
    bg: p.color + ".500",
  })),
  Button: withDefaultProps(Button, (p) => ({
    variantColor: p.highlight ? "blue" : "gray",
  })),
}

/* -------------------- Breakout -------------------- */

const MotionBox = motion.custom(Box)

const Brick = withDefaultProps(MotionBox, {
  bg: "blue.500",
  position: "absolute",
  top: 0,
  left: 0,
})

const Paddle = withDefaultProps(MotionBox, {
  bg: "blue.500",
  position: "absolute",
  top: 0,
  left: 0,
})

const Ball = withDefaultProps(MotionBox, {
  bg: "red.500",
  borderRadius: "100%",
  position: "absolute",
  top: 0,
  left: 0,
})

export const Breakout = {
  Layout: withDefaultProps(Layout, () => ({
    gridGap: 4,
    w: "min-content",
  })),
  PlayField: withDefaultProps(Grid, (p) => ({
    position: "relative",
    width: 400,
    height: 240,
    bg: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
  })),
  Brick,
  Paddle,
  Ball,
  Button: withDefaultProps(Button, (p) => ({
    width: "100%",
    variantColor: p.highlight ? "blue" : "gray",
  })),
  Stats: withDefaultProps(Grid, (p) => {
    return {
      textAlign: "right",
      templateColumns: "min-content auto",
    }
  }),
  Label: withDefaultProps(Text, (p) => {
    return {
      textAlign: "left",
      display: "inline",
      fontWeight: "bold",
    }
  }),
}

/* --------------------- Drawing -------------------- */

const CanvasFrame = React.forwardRef((props, ref) => {
  return (
    <Box
      position="relative"
      height={400}
      width={320}
      css={{
        "& > *": {
          position: "absolute",
          top: 0,
          left: 0,
        },
      }}
      bg="gray.100"
      {...props}
      ref={ref}
    />
  )
})

export const Drawing = {
  Layout: withDefaultProps(Layout, () => ({
    gridGap: 4,
    w: "min-content",
  })),
  CanvasFrame,
  Buttons: withDefaultProps(Grid, {
    gridAutoFlow: "column",
    gap: 1,
  }),
  ColorButton: withDefaultProps(Button, (p) => ({
    variantColor: p.color,
    borderBottomWidth: 5,
    borderStyle: "solid",
    borderColor: p.highlight ? p.color + ".500" : "transparent",
  })),
  SizeButton: withDefaultProps(Button, (p) => ({
    borderBottomWidth: 5,
    borderStyle: "solid",
    borderColor: p.highlight ? "gray.500" : "transparent",
  })),
  Button: withDefaultProps(Button, (p) => ({
    width: "1fr",
    variantColor: p.highlight ? "blue" : "gray",
  })),
}

/* ---------------------- Dogs ---------------------- */

export const Dogs = {
  Layout: withDefaultProps(Layout, () => ({
    gridGap: 4,
  })),
  Image: withDefaultProps(Box, (p) => ({
    w: 280,
    h: 280,
    bg: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
    style: {
      backgroundImage: `url(${p.image})`,
      backgroundSize: "cover",
    },
  })),
  Button: withDefaultProps(Button, (p) => ({
    width: "1fr",
    variantColor: p.highlight ? "blue" : "gray",
  })),
}

/* ------------------- Calculator ------------------- */

export const Calculator = {
  Layout: withDefaultProps(Layout, () => ({
    gridGap: 4,
    gridTemplateColumns: "repeat(4, 48px)",
  })),
  Operation: withDefaultProps(Text, (p) => ({
    textAlign: "right",
    gridColumn: "span 4",
    height: 5,
    p: 0,
    mb: 1,
  })),
  Value: withDefaultProps(Heading, (p) => ({
    textAlign: "right",
    gridColumn: "span 4",
    size: "2xl",
    p: 2,
    bg: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
  })),
  Button: withDefaultProps(Button, (p) => ({
    variantColor: p.highlight ? "blue" : "gray",
  })),
  ZeroButton: withDefaultProps(Button, (p) => ({
    gridColumn: "span 2",
    variantColor: p.highlight ? "blue" : "gray",
  })),
}

/* --------------------- Player --------------------- */

export const Player = {
  Layout: withDefaultProps(Stack, (p) => ({
    flexDirection: "column",
    spacing: 3,
    ariaLabel: "container",
    p: 4,
    borderRadius: 8,
    width: "fit-content",
    maxWidth: 700,
    margin: "0 auto",
    boxShadow: "0 4px 12px -4px rgba(0,0,5,.05)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.200",
    bg: p.colorMode === "dark" ? "whiteAlpha.100" : "gray.50",
    overflow: "hidden",
  })),
  CurrentTime: withDefaultProps(Heading, (p) => ({
    bg: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
    p: 2,
    size: "2xl",
    textAlign: "right",
    fontFamily: "mono",
  })),
  Buttons: withDefaultProps(Grid, {
    gridAutoFlow: "column",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridGap: 2,
  }),
  Button: withDefaultProps(IconButton, (p) => ({
    variantColor: "blue",
  })),
  Wheels: withDefaultProps(Flex, (p) => ({
    bg: p.colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100",
    padding: 2,
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    borderRadius: 4,
    height: "75%",
    overflow: "hidden",
  })),
  Wheel: withDefaultProps(PseudoBox, (p) => ({
    position: "relative",
    height: 160,
    width: 160,
    transform: `scale(${0.05 + p.value * 0.95})`,
    borderRadius: "100%",
    bg: p.colorMode === "dark" ? "whiteAlpha.300" : "blackAlpha.300",
  })),

  Slider: (p) => {
    return (
      <Slider {...p}>
        <SliderTrack />
        <SliderFilledTrack bg={"red.500"} />
        <SliderThumb bg={"red.500"} />
      </Slider>
    )
  },
}

export { theme, Button, Divider, Heading, IconButton, Switch, Text }
