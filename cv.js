/* cv.html: egen adress, inte sajtens kontakt@. Byggs ihop i JS för att slippa
   spam-bottar. Egen fil och inte inline: inline-skript kräver 'unsafe-inline' i CSP:n. */
(function(){
  var u='patz.lofgren', d='gmail.com', el=document.getElementById('cv-epost');
  if(!el) return;
  var a=document.createElement('a');
  a.href='mai'+'lto:'+u+'@'+d;
  a.textContent=u+'@'+d;
  el.appendChild(a);
})();
