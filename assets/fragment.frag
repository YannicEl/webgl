#version 300 es

in lowp vec4 v_color;

out highp vec4 frag_color;

void main() {
  frag_color = v_color;
}