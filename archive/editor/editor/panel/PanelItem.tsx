import * as React from "react"
import { useStateDesigner } from "@state-designer/react"
import { SelectOptionHeader } from "../shared"
import { MoreHorizontal } from "react-feather"
import { Circle, Disc, Square } from "react-feather"
import { Box, Flex, Button, Input } from "theme-ui"
import { DraggableProvided } from "react-beautiful-dnd"

export const PanelItem: React.FC<{
  isActive: boolean
  value: string
  depth?: number
  provided?: DraggableProvided
  icon?: "circle" | "disc" | "square"
  options?: {
    title: string
    functions: Record<
      string,
      null | ((input: HTMLInputElement, send: (event: string) => void) => void)
    >
  }
  onFormat?: (value: string) => string
  onSelect?: () => void
  onChange?: (value: string) => void
}> = ({
  onSelect,
  onFormat,
  value,
  options,
  depth = 0,
  icon,
  isActive,
  onChange,
  provided,
  children,
}) => {
  const { send, values, isIn } = useStateDesigner(
    {
      data: { value },
      initial: "idle",
      states: {
        idle: {
          on: { FOCUSED: { to: "editing" } },
        },
        editing: {
          onEnter: "focusInput",
          on: {
            CHANGED_VALUE: {
              if: "valueIsClean",
              to: "clean",
              else: { to: "dirty" },
            },
            CANCELLED: {
              do: "resetValue",
              to: "idle",
            },
          },
          initial: "clean",
          states: {
            clean: {
              on: {
                BLURRED: { to: "idle" },
              },
            },
            dirty: {
              on: {
                SUBMITTED: { do: "submitValue", to: "idle" },
                BLURRED: { do: "submitValue", to: "idle" },
              },
            },
          },
        },
      },
      on: {
        CHANGED_VALUE: "setValue",
      },
      conditions: {
        valueIsClean(data) {
          return data.value === value
        },
      },
      actions: {
        focusInput() {},
        resetValue(data) {
          data.value = value
        },
        setValue(data, payload) {
          data.value = onFormat ? onFormat(payload) : payload
        },
        submitValue(data) {
          onChange && onChange(data.value)
        },
      },
      values: {
        value(data) {
          return data.value || ""
        },
      },
    },
    [value]
  )

  const [isHovered, setHovered] = React.useState(false)

  const rInput = React.useRef<HTMLInputElement>()

  return (
    <li ref={provided?.innerRef} {...provided?.draggableProps}>
      <Flex
        sx={{
          width: "100%",
          py: 0,
          pl: 0,
          pr: 0,
          border: "1px solid",
          alignItems: "center",
          justifyContent: "flex-start",
          borderColor: "transparent",
          bg: isActive ? "primary" : "transparent",
          "&:hover": {
            bg: isActive ? "primary" : "tint",
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {icon && (
          <Flex
            {...provided?.dragHandleProps}
            sx={{
              cursor: "grab",
              height: 32,
              width: 32 + depth * 16,
              alignItems: "center",
              justifyContent: "center",
              pr: 1,
              pl: depth * 16 + "px",
              pb: "1px",
              opacity: 0.7,
            }}
          >
            {icon === "disc" ? (
              <Disc size={12} style={{ marginLeft: 8 }} />
            ) : icon === "circle" ? (
              <Circle size={12} style={{ marginLeft: 8 }} />
            ) : icon === "square" ? (
              <Square size={10} style={{ marginLeft: 10 }} />
            ) : null}
          </Flex>
        )}
        <Button
          variant="link"
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridAutoColumns: "auto",
            width: "100%",
            p: 0,
            m: 0,
            userSelect: "none",
            "&:hover > div": {
              opacity: 1,
            },
          }}
          onDoubleClick={() => {
            send("FOCUSED")
            const input = rInput.current
            setTimeout(() => {
              input.setSelectionRange(0, -1)
              input.focus()
            }, 16)
          }}
          onClick={() => onSelect && onSelect()}
        >
          <label
            style={{
              pointerEvents: isIn("editing") ? "all" : "none",
              display: "inline-block",
            }}
          >
            <Input
              ref={rInput}
              variant="item"
              sx={{
                ml: 0,
                pl: icon ? 1 : 2,
                cursor: "pointer",
              }}
              value={values.value}
              disabled={!isIn("editing")}
              onBlur={(e) => {
                send("BLURRED")
                const input = rInput.current
                input.setSelectionRange(0, 0)
              }}
              onKeyUp={(e) => {
                switch (e.key) {
                  case "Enter": {
                    send("SUBMITTED")
                    const input = rInput.current
                    input.setSelectionRange(0, 0)
                    input.blur()
                    break
                  }
                  case "Escape": {
                    send("CANCELLED")
                    const input = rInput.current
                    input.setSelectionRange(0, 0)
                    input.blur()
                    break
                  }
                  default: {
                  }
                }
              }}
              onChange={(e) => send("CHANGED_VALUE", e.target.value)}
            />
          </label>
        </Button>
        {options && !isIn("editing") && (
          <Box
            sx={{
              ml: 0,
              opacity: isHovered ? 1 : 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <select
              style={{
                cursor: "pointer",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
              }}
              value={""}
              onChange={(e) => {
                const input = rInput.current
                const fn = options.functions[e.target.value]
                fn && fn(input, send)
              }}
            >
              <SelectOptionHeader>{options.title}</SelectOptionHeader>
              {Object.entries(options.functions).map(([key, value], i) => (
                <option key={i} value={key} disabled={value === null}>
                  {key}
                </option>
              ))}
            </select>
            <MoreHorizontal
              style={{ pointerEvents: "none", marginLeft: 8, marginRight: 8 }}
            />
          </Box>
        )}
      </Flex>
      {children}
    </li>
  )
}
