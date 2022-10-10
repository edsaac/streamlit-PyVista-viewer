// The `Streamlit` object exists because our html file includes
// `streamlit-component-lib.js`.
// If you get an error about "Streamlit" not being defined, that
// means you're missing that file.

function sendValue(value) {
  Streamlit.setComponentValue(value)
}

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event) {
  
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {

    // You most likely want to get the data passed in like this
    const {threejs_html, width, height, key} = event.detail.args;
    
    const div_all = document.getElementById("stPyVista");
    const st_iframe = document.getElementById("stPyVistaFrame");
    const div_click = document.getElementById("clickable") 
    
    // Streamlit.setFrameHeight(height + 40);

    // div_all.innerHTML = value;
    // div_all.style.height = "500px";

    // Pass the threejs HTML to the iframe
    st_iframe.srcdoc = threejs_html;
    
    // Overwrite default iframe dimensions
    st_iframe.width = width + 20;
    st_iframe.height = height + 25;

    // Test sending back a value
    // div_all.addEventListener('click', event => sendValue(666999), false);
    div_click.addEventListener('click', event => sendValue(888), false);
    
    // div_all.addEventListener('pointer', event => changeColor("red"), false);

    // Remove default iframe border. A border can be set from the pv.Plotter
    st_iframe.style.border = "none";
    window.rendered = true;
  }
}

// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()

// Render with the correct height, if this is a fixed-height component
Streamlit.setFrameHeight(600)
