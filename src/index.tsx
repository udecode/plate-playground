import 'tippy.js/dist/tippy.css'
import './index.css'
import ReactDOM from 'react-dom'
import { useRef } from 'react'
import {
  AutoformatPlugin,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createComboboxPlugin,
  createDeserializeCsvPlugin,
  createDeserializeDocxPlugin,
  createDeserializeMdPlugin,
  createDndPlugin,
  createExitBreakPlugin,
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHorizontalRulePlugin,
  createImagePlugin,
  createIndentPlugin,
  createItalicPlugin,
  createKbdPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createMentionPlugin,
  createNodeIdPlugin,
  createNormalizeTypesPlugin,
  createParagraphPlugin,
  createPlateUI,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  ELEMENT_CODE_BLOCK,
  HeadingToolbar,
  MentionCombobox,
  Plate,
  PlateEventProvider,
  StyledElement,
} from '@udecode/plate'
import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
  ExcalidrawElement,
} from '@udecode/plate-ui-excalidraw'
import { createJuicePlugin } from '@udecode/plate-juice'
import { MarkBallonToolbar, ToolbarButtons } from './config/components/Toolbars'
import {
  withStyledPlaceHolders,
} from './config/components/withStyledPlaceHolders'
import { withStyledDraggables } from './config/components/withStyledDraggables'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { MENTIONABLES } from './config/mentionables'
import { CONFIG } from './config/config'
import { VALUES } from './config/values/values'
import { createDragOverCursorPlugin } from './config/plugins'
import {
  CursorOverlayContainer,
} from './config/components/CursorOverlayContainer'
import {
  createMyPlugins,
  MyEditor,
  MyPlatePlugin,
  MyValue,
} from './config/typescript'
import { createPortivePlugin } from './plugins/portive/index';

// Migrate to v8 - Part 1: https://www.loom.com/share/71596199ad5a47c2b58cdebab26f4642
// Migrate to v8 - Part 2: https://www.loom.com/share/d85c89220ffa4fe2b6f934a6c6530689
// Migrate to v8 - Part 3: https://www.loom.com/share/c1bf20e18d8a42f8a55f8a28ab605148

const id = 'Examples/Playground'

let components = createPlateUI({
  [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
  [ELEMENT_CODE_BLOCK]: StyledElement,
  // customize your components by plugin key
})
components = withStyledPlaceHolders(components)
components = withStyledDraggables(components)

const plugins = createMyPlugins(
  [
    createParagraphPlugin(),
    createBlockquotePlugin(),
    createTodoListPlugin(),
    createHeadingPlugin(),
    createImagePlugin({
      type: 'image-block'
    }),
    createPortivePlugin({
      apiOriginUrl: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imo0YlpVSGFQMmtlQmNyYTQifQ.eyJwYXRoIjoiKiovKiIsImlhdCI6MTY1NTU5OTg1MSwiZXhwIjoxNjg3MTU3NDUxfQ.WQpbtMbkH5sRvWgFNZrge1qLFb7FVNkdGzumbPPkm6M',
      path: "plate-portive",
    }),
    createHorizontalRulePlugin(),
    createLinkPlugin(),
    createListPlugin(),
    createTablePlugin(),
    createMediaEmbedPlugin(),
    createExcalidrawPlugin() as MyPlatePlugin,
    createCodeBlockPlugin(),
    createAlignPlugin(CONFIG.align),
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createHighlightPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createKbdPlugin(),
    createNodeIdPlugin(),
    createDndPlugin(),
    createDragOverCursorPlugin(),
    createIndentPlugin(CONFIG.indent),
    createAutoformatPlugin<
      AutoformatPlugin<MyValue, MyEditor>,
      MyValue,
      MyEditor
    >(CONFIG.autoformat),
    createResetNodePlugin(CONFIG.resetBlockType),
    createSoftBreakPlugin(CONFIG.softBreak),
    createExitBreakPlugin(CONFIG.exitBreak),
    createNormalizeTypesPlugin(CONFIG.forceLayout),
    createTrailingBlockPlugin(CONFIG.trailingBlock),
    createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
    createComboboxPlugin(),
    createMentionPlugin(),
    createDeserializeMdPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeDocxPlugin(),
    createJuicePlugin() as MyPlatePlugin,
  ],
  {
    components,
  }
)

const Plugins = () => {
  const containerRef = useRef(null)

  return (
    <DndProvider backend={HTML5Backend}>
      <PlateEventProvider>
        <HeadingToolbar>
          <ToolbarButtons />
        </HeadingToolbar>
      </PlateEventProvider>

      <div ref={containerRef} style={{ position: 'relative' }}>
        <Plate<MyValue, MyEditor>
          id={id}
          editableProps={CONFIG.editableProps}
          initialValue={VALUES.playground}
          plugins={plugins}
        >
          <MarkBallonToolbar />

          <MentionCombobox items={MENTIONABLES} />

          <CursorOverlayContainer containerRef={containerRef} />
        </Plate>
      </div>
    </DndProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<Plugins />, rootElement)
