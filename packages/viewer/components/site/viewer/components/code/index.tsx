import * as React from "react"
import Column from "../column"
import {
  Project,
  StateEditorState,
  JsxEditorState,
  StaticsEditorState,
} from "../../states"
import { useStateDesigner } from "@state-designer/react"
import JsxEditor from "./jsx-editor"
import StateEditor from "./state-editor"
// import ThemeEditor from "./theme-editor"
import StaticEditor from "./static-editor"
import SaveRow from "./save-row"
import { motion } from "framer-motion"

const CodeColumn: React.FC = (props) => {
  const local = useStateDesigner(Project)

  return (
    <Column
      sx={{
        gridArea: "code",
        position: "relative",
        p: 0,
        borderLeft: "outline",
        borderColor: "border",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "100% 100% 100%",
          gridTemplateRows: "1fr 40px",
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 800,
          restDelta: 1,
          restSpeed: 1,
          mass: 0.9,
        }}
        variants={{
          state: { x: 0 },
          jsx: { x: "-100%" },
          // theme: { x: "-200%" },
          static: { x: "-200%" },
        }}
        animate={local.whenIn({
          state: "state",
          jsx: "jsx",
          static: "static",
          theme: "theme",
        })}
      >
        <StateEditor key={"state"} readOnly={!local.data.isOwner} />
        <JsxEditor key={"react"} readOnly={!local.data.isOwner} />
        {/* <ThemeEditor key={"theme"} readOnly={!local.data.isOwner} /> */}
        <StaticEditor key={"static"} readOnly={!local.data.isOwner} />
        {local.data.isOwner && <SaveRow state={StateEditorState} />}
        {local.data.isOwner && <SaveRow state={JsxEditorState} />}
        {/* {local.data.isOwner && <SaveRow state={ThemeEditorState} />} */}
        {local.data.isOwner && <SaveRow state={StaticsEditorState} />}
      </motion.div>
    </Column>
  )
}

export default CodeColumn
