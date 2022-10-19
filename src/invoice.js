function StoreList () {
  labkodingMain().restriction()
  const { state, dispatch } = React.useContext(ContextOne)
  React.useEffect(() => {
    labkodingMain().fetchAllStore(function (listData) {
      dispatch({ type: 'setStoreList', payload: listData })
      const storeId = listData[0].id
      labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
        dispatch({ type: 'setSuratjalanList', payload: listData })
      }, storeId)
    })
  }, [])
  const handleOnChangeComboboxStore = (e) => {
    // fetch surat jalan by store id
    labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
        dispatch({ type: 'setSuratjalanList', payload: listData })
      }, e.target.value)
  }
  return (
    <React.Fragment>
      <select name='store' id='store' onChange={handleOnChangeComboboxStore}>
        {state.storeList.map((r, i) => (<option key={i} value={r.id}>{r.label}</option>))}
      </select>
    </React.Fragment>
  )
}
function InvoiceMain() {
    return (
        <ContextOneProvider>
            {ReactDOM.createPortal(<StoreList />, document.querySelector('#combobox_store'))}
            {ReactDOM.createPortal(<InvoiceSuratJalan />, document.querySelector('#daftar_suratjalan'))}
        </ContextOneProvider>    
    )
}
ReactDOM.render(<InvoiceMain />, document.querySelector('#root'));
