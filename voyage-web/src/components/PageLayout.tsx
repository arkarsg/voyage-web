const RootLayout = (props: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {props.children}
    </div>
  )
}

export default RootLayout;