import { KIcon } from '@kiwi/kiwi-app/components';
import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { FormUploadConfig } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { map } from 'lodash';
import KBox from '../../k-box';
import KButton from '../../k-button';
import KInput from '../../k-input';
import KPicture from '../../k-picture';
import { FormItemProps } from '../props';
import updateValue from '../utils/update-value';

/**
 * 上传表单子组件
 */
const FormUpload: FunctionComponent<FormItemProps<FormUploadConfig>> = (context) => {
  const { defaultValue, formItemConfig, formItemInfo } = context.props;
  const { formUid, formDataIndex } = formItemInfo;
  const { fileType, multiple, handleUpload } = formItemConfig;
  const mimeType = {
    image: 'image/*',
    audio: 'audio/mp3, audio/m4a, audio/wav',
    video: 'video/mp4, video/*'
  };

  return (
    <KBox styledProps={context.props}>
      {fileType === 'image' && (
        <KBox inlineBlock>
          {map(defaultValue ? defaultValue.split('&') : [], (fileUrl) => (
            <KPicture
              file={fileUrl}
              height="30px"
              inlineBlock
              marginRight="margin2"
              cursor="pointer"
              onClick={() => window.open(fileUrl)}
            />
          ))}
        </KBox>
      )}
      <KInput
        id={`form_upload_${formUid}_${formDataIndex}`}
        type="file"
        hidden
        multiple={multiple}
        accept={mimeType[fileType]}
        handleChange={async (event) => {
          const files: File[] = event.currentTarget['files'];
          const fileUrls = await handleUpload(files);
          const value = fileUrls.join('&');
          updateValue(value, formItemConfig, formItemInfo);
        }}
      />
      <KButton
        onClick={() => {
          const uploadInput = document.getElementById(`form_upload_${formUid}_${formDataIndex}`);
          uploadInput.click();
        }}
      >
        <KIcon.CloudUpload />
        {' 上传'}
      </KButton>
    </KBox>
  );
};

export default FormUpload;
