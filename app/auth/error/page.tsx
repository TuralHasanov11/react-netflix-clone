import React from 'react'

type Props = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
  };


export default function AuthError(props: Props) {

    const searchParams = props.searchParams;
 
  return (
    <div>{searchParams.error}</div>
  )
}
