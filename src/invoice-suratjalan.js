function DaftarSuratJalanItem ({ row }) {
  const handleOnClickCheckbox = (e) => {
    console.log("Clicked, new value = ", e.target.checked);
  }
  return (
    <React.Fragment>
      <div className='checkbox_wrap'>
        <div className='checkbox_left'>
          <a href={"/suratjalan.html?id="+row.id}>{row.label}</a>
        </div>
        <div className='checkbox_right'>
          <i className='fas fa-check' />
          <input type='checkbox' className='checkbox' onClick={handleOnClickCheckbox} />
          <i className='fas fa-times' />
        </div>
      </div>
    </React.Fragment>
  )
}
function InvoiceSuratJalan () {
  labkodingMain().restriction()
  const { state, dispatch } = React.useContext(ContextOne)
  const storeId = ''
  React.useEffect(() => {
    // labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
    //   dispatch({ type: 'setSuratjalanList', payload: listData })
    // }, storeId)
  }, [])
  const handleOnChangeComboboxStore = () => {
    // fetch surat jalan by store id
  }
  return (
    <React.Fragment>
      {state.suratJalanList.map((r, i) => (<DaftarSuratJalanItem key={i} row={r} />))}
      <div className="next">
          <button>Next</button>
      </div>
    </React.Fragment>
  )
}
// ReactDOM.render(<ContextOneProvider><App /></ContextOneProvider>, document.querySelector('#daftar_suratjalan'))
