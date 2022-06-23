import {
  createPluginFactory,
  OverrideByKey,
  PlatePlugin,
} from '@udecode/plate-core';
import {
  createImageBlock,
  handleDropFile,
  withPortive,
  WithPortiveOptions,
} from 'slate-portive';
import { MyEditor, MyValue } from '../../config/typescript';

export type PortivePlugin = {};

export const KEY_PORTIVE = 'portive';

/**
 * @see {@link withPortive}
 */
export const createPortivePlugin = (
  portiveOptions: Partial<WithPortiveOptions>,
  override?: Partial<
    PlatePlugin<PortivePlugin, MyValue, MyEditor>
  >,
  overrideByKey: OverrideByKey<MyValue, MyEditor> = {}
) =>
  createPluginFactory<PortivePlugin, MyValue, MyEditor>({
    key: KEY_PORTIVE,
    withOverrides: (editor) =>
      withPortive(editor as any, {
        // createFileElement: createAttachmentBlock,
        ...portiveOptions as Required<WithPortiveOptions>,
        createImageFileElement: createImageBlock,
      }),
    handlers: {
      onPaste: (editor) => editor.portive.handlePaste,
      onDrop: (editor) => (e) => handleDropFile(editor as any, e),
    },
  })(override, overrideByKey);
