(function(){
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab-btn'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));

    function activate(target, focusPanel){
      tabs.forEach(function(t){
        var on = t.getAttribute('data-target') === target;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function(p){
        p.classList.toggle('is-active', p.getAttribute('data-panel') === target);
      });
      if(history.replaceState){ history.replaceState(null, '', '#' + target); }
      if(focusPanel){
        var active = document.querySelector('[data-panel="' + target + '"]');
        if(active){ active.focus({preventScroll:true}); }
      }
      window.scrollTo({top:0, behavior:'smooth'});
    }

    tabs.forEach(function(t){
      t.addEventListener('click', function(){ activate(t.getAttribute('data-target'), true); });
    });

    // keyboard: left/right arrows move between tabs when one is focused
    document.querySelector('.routes').addEventListener('keydown', function(e){
      if(e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var idx = tabs.indexOf(document.activeElement);
      if(idx === -1) return;
      e.preventDefault();
      var next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
      tabs[next].focus();
      activate(tabs[next].getAttribute('data-target'), false);
    });

    // deep-link support: /#projects opens straight to that tab
    var initial = (location.hash || '').replace('#','');
    if(initial && document.querySelector('[data-panel="' + initial + '"]')){
      activate(initial, false);
    }
  })();
