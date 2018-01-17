import * as React from 'react';

interface ILoaderProps {
  visible: boolean;
}
export const LoaderComponent: React.SFC<ILoaderProps> = (props: ILoaderProps) => {
  if(props.visible) {
    return <div className='loader'>Loading...</div>
  }

  return null;
};
