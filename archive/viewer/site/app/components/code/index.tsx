import * as React from "react"
import Column from "../column"
import {
  Project,
  StateEditorState,
  JsxEditorState,
  TestsEditorState,
  StaticsEditorState,
} from "../../states"
import { initMonaco } from "./monaco"
import { useStateDesigner } from "@state-designer/react"
import JsxEditor from "./jsx-editor"
import StateEditor from "./state-editor"
// import ThemeEditor from "./theme-editor"
import StaticEditor from "./static-editor"
import TabbedEditor from "./tabbed-editor"
import TestsEditor from "./tests-editor"
import SaveRow from "./save-row"
import { motion } from "framer-motion"

const CodeColumn: React.FC<{ authenticated: boolean }> = ({
  authenticated,
}) => {
  const local = useStateDesigner(Project)

  React.useEffect(() => {
    initMonaco()
  }, [])

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
          gridTemplateColumns: "100% 100% 100% 100%",
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
          static: { x: "-200%" },
          tests: { x: "-300%" },
        }}
        animate={local.whenIn({
          state: "state",
          jsx: "jsx",
          static: "static",
          tests: "tests",
        })}
      >
        <StateEditor readOnly={!authenticated} />
        {/* <TabbedEditor readOnly={!local.data.isOwner} /> */}
        <JsxEditor readOnly={!authenticated} />
        {/* <ThemeEditor key={"theme"} readOnly={!local.data.isOwner} /> */}
        <StaticEditor readOnly={!authenticated} />
        <TestsEditor readOnly={!authenticated} />
        {authenticated && <SaveRow state={StateEditorState} />}
        {authenticated && <SaveRow state={JsxEditorState} />}
        {/* {local.data.isOwner && <SaveRow state={ThemeEditorState} />} */}
        {authenticated && <SaveRow state={StaticsEditorState} />}
        {authenticated && <SaveRow state={TestsEditorState} />}
      </motion.div>
    </Column>
  )
}

export default CodeColumn
