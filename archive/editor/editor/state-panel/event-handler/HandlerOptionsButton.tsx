// @refresh reset
import * as React from "react"
import { MoreVertical } from "react-feather"
import globalState from "../../state"
import * as T from "../../types"
import { Box, IconButton } from "theme-ui"
import { SelectOptionHeader } from "../../shared"

export const HandlerOptionsButton: React.FC<{
  node: T.StateNode
  handler: T.EventHandler
}> = ({ node, handler }) => {
  return (
    <Box sx={{ position: "relative", height: "100%", cursor: "pointer" }}>
      <select
        style={{ opacity: 0, height: "100%", cursor: "pointer" }}
        value={""}
        onChange={(e) => {
          switch (e.target.value) {
            case "move up": {
              globalState.send("MOVED_EVENT_HANDLER", {
                stateId: node.id,
                eventId: handler.event,
                delta: -1,
              })
              break
            }
            case "move down": {
              globalState.send("MOVED_EVENT_HANDLER", {
                stateId: node.id,
                eventId: handler.event,
                delta: 1,
              })
              break
            }
            case "delete": {
              globalState.send("DELETED_EVENT_HANDLER_FROM_STATE", {
                stateId: node.id,
                eventId: handler.event,
              })
              break
            }
          }
        }}
      >
        <SelectOptionHeader>Event Handler</SelectOptionHeader>
        {handler.index > 0 && <option value="move up">Move Up</option>}
        {handler.index < node.eventHandlers.size - 1 && (
          <option value="move down">Move Down</option>
        )}
        <option value="delete">Delete</option>
      </select>
      <IconButton
        sx={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
        }}
      >
        <MoreVertical />
      </IconButton>
    </Box>
  )
}
