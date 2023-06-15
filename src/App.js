import $ from 'jquery';
import './App.css';
import Planet from './planet.png';

function App() {
  let scale = 1;
  let translate = 0;
  let opacity = 1;

  const SCALE_SPEED = 1.07;
  const TRANSLATE_SPEED = 0.05;
  const OPACITY_SPEED = 0.02;

  function elementZoom(e) {
    const top_of_element = $("#zoom").offset().top + 5;
    const top_of_screen = $(window).scrollTop();
    const bottom_of_element = $("#zoom").offset().top + $("#zoom").outerHeight() - 5;
    const bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();

    const body = $("body");
    const section2 = $(".section-2");

    if (top_of_screen <= top_of_element && bottom_of_screen >= bottom_of_element) {
      body.css({"overflow": "hidden", "height": "100%"});
      if (opacity === 1) {
        if (e.deltaY > 0) {
          scale = Math.min(200, scale * SCALE_SPEED);
          translate = Math.max(-50, translate - TRANSLATE_SPEED);
        }
        else if (e.deltaY < 0) {
          scale = Math.max(1, scale / SCALE_SPEED);
          translate = Math.min(0, translate + TRANSLATE_SPEED);
        }

        $(".planet").css("transform", `scale(${scale}) translate(${translate}%, ${translate}%)`);
      }

      if (scale === 1 && opacity === 1 && e.deltaY < 0) {
        body.css({"overflow": "", "height": ""});
      }

      if (scale === 200) {
        if (e.deltaY > 0) {
          opacity = Math.max(0, opacity - OPACITY_SPEED);
        }
        else if (e.deltaY < 0) {
          opacity = Math.min(1, opacity + OPACITY_SPEED);
        }

        section2.css("opacity", opacity);
      }
    }
  }

  document.addEventListener("wheel", (e) => elementZoom(e));

  return (
    <div className="App">
      <div className="section section-1">
        Section 1
      </div>
      <div className="animation-section">
        <div id="zoom" className="section section-2">
          <div className="planet-container">
            <img className="planet" src={Planet} alt="planet" />
          </div>
        </div>
        <div className="section section-3">
          Section 3
        </div>
      </div>
    </div>
  );
}

export default App;
