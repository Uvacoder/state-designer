// @refresh reset
import * as React from "react"
import { sortBy } from "lodash"
import { useStateDesigner } from "@state-designer/react"
import { HandlerOptionsButton } from "./HandlerOptionsButton"
import globalState from "../../state"
import * as T from "../../types"
import { Plus } from "react-feather"
import { EventHandlerLink } from "./EventHandlerLink"
import { SelectOptionHeader } from "../../shared"
import { IconButton, Divider, Card, Select, Grid } from "theme-ui"

export const EventHandler: React.FC<{
  handler: T.EventHandler
  node: T.StateNode
}> = ({ node, handler }) => {
  const global = useStateDesigner(globalState)
  const event = global.data.events.get(handler.event)

  const links = sortBy(Array.from(handler.chain.values()), "index")

  return (
    <Card variant="editor.handler">
      <Grid
        columns={"40px auto 44px"}
        gap={2}
        pl={3}
        sx={{ alignItems: "center" }}
      >
        On:
        <Select
          defaultValue={event.id}
          onChange={(e) => {
            globalState.send("CHANGED_EVENT_HANDLER", {
              stateId: node.id,
              eventId: event.id,
              id: e.target.value,
            })
          }}
        >
          <SelectOptionHeader>Event</SelectOptionHeader>
          {global.values.events.map((event) => (
            <option
              key={event.id}
              disabled={node.eventHandlers.has(event.id)}
              value={event.id}
            >
              {event.name}
            </option>
          ))}
        </Select>
        <HandlerOptionsButton node={node} handler={handler} />
      </Grid>
      <Divider mx={-3} />
      {links.map((link) => (
        <EventHandlerLink
          key={link.id}
          node={node}
          handler={handler}
          link={link}
        />
      ))}
      <Divider mx={-3} />
      <Grid sx={{ gridAutoColumns: "1fr", gridAutoFlow: "column" }}>
        <IconButton
          sx={{ width: "100%" }}
          onClick={() =>
            globalState.send("CREATED_LINK", {
              stateId: node.id,
              eventId: event.id,
            })
          }
        >
          <Plus />
        </IconButton>
      </Grid>
    </Card>
  )
}
