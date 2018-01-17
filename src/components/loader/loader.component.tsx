import * as React from 'react';

interface ILoaderProps {
  visible: boolean;
}
const LoaderComponent: React.SFC<ILoaderProps> = (props: ILoaderProps) => {
  if(props.visible) {
    return <div>Loading...</div>
  }

  return null;
};

export {LoaderComponent};