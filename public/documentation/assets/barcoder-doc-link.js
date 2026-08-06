(function(){
  function currentLanguage(){
    const select=document.getElementById('app_lang');
    const allowed=['fr','en','es','zh','hi'];
    const value=select&&select.value?select.value:'fr';
    return allowed.includes(value)?value:'fr';
  }
  function openDocs(moduleName,section,anchor){
    const url=new URL('documentation/index.html',document.baseURI);
    url.searchParams.set('lang',currentLanguage());
    url.searchParams.set('module',moduleName||'openmetabar');
    url.searchParams.set('section',section==='reference'?'reference':'guide');
    if(anchor)url.searchParams.set('anchor',anchor);
    window.open(url.toString(),'_blank','noopener');
  }
  window.BarCodeRDocs={open:openDocs};
})();
