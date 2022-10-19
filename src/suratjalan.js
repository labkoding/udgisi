function submitSuratjalan() {
    let suratjalan_quantity = document.getElementById('suratjalan_quantity').value;
    console.log('suratjalan_quantity:', suratjalan_quantity);
    let suratjalan_price = document.getElementById('suratjalan_price').value;
    console.log('suratjalan_price:', suratjalan_price);
    let store = document.getElementById('store').value;
    console.log('store:', store);
    var accessToken = labkodingMain().getAccessToken()
    
    const graphqlstr = `upsertTbSuratjalan(request:{nomor_surat:"${new Date().getTime()}",store_id:"${store}",quantity:${suratjalan_quantity},price:"${suratjalan_price}"}){  status,error,detail_data{id,nomor_surat,store_id,quantity,price,created_dt,updated_dt,created_by,updated_by,version} }`;
    const query = JSON.stringify({query: "mutation{ " + graphqlstr + " }"})
    
    
    fetch(AppConfig.graphqlBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'AccessToken': accessToken,
          'hmac': labkodingMain().generateHmac(query),
        },
        body: query
      })
        .then(r => r.json())
        .then(data => {
          if(data.data.upsertTbSuratjalan.status === 200) window.location.href = '/sjpreview.html?id='+data.data.upsertTbSuratjalan.detail_data.id;
          else alert(data.data.upsertTbSuratjalan.error)
        });
}

function StoreList({ currentId }) {
  labkodingMain().restriction()
  const { state, dispatch } = React.useContext(ContextOne)
  React.useEffect(() => {
    labkodingMain().fetchAllStore(function (listData) {
      dispatch({ type: 'setStoreList', payload: listData })
      // const storeId = listData[0].id
      // labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
      //   dispatch({ type: 'setSuratjalanList', payload: listData })
      // }, storeId)
    })
  }, [])
  const handleOnChangeComboboxStore = (e) => {
    // fetch surat jalan by store id
    // labkodingMain().fetchAllSuratjalanByStoreId(function (listData) {
    //     dispatch({ type: 'setSuratjalanList', payload: listData })
    //   }, e.target.value)
  }
  return (
    <React.Fragment>
      <select name='store' id='store' onChange={handleOnChangeComboboxStore}>
        {state.storeList.map((r, i) => (<option key={i} value={r.id} selected={currentId==r.id}>{r.label}</option>))}
      </select>
    </React.Fragment>
  )
}

function SuratjalanMain() {
  const { state, dispatch } = React.useContext(ContextOne)
  // init data
  // get detail surat jalan
  React.useEffect(() => {
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    labkodingMain().fetchOneSuratjalanById(id, function(data = {}){
      dispatch({ type: 'setSuratjalanDetail', payload: data })
      // set value input text
      // const val = data || {}
      document.getElementById('suratjalan_quantity').value = data.quantity || ''
      document.getElementById('suratjalan_price').value = data.price || ''
    })
  }, [])
  return (
      <ContextOneProvider>
          {ReactDOM.createPortal(<StoreList currentId={(state.suratjalanDetail || {}).store_id} />, document.querySelector('#combobox_store'))}
          {/* {ReactDOM.createPortal(<InvoiceSuratJalan />, document.querySelector('#daftar_suratjalan'))} */}
      </ContextOneProvider>    
  )
}

ReactDOM.render(<ContextOneProvider><SuratjalanMain/></ContextOneProvider>, document.querySelector('#root'));
// ReactDOM.render(<App/>, document.querySelector('#suratjalan_content'));