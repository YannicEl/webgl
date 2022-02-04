#version 300 es

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec2 a_texcoord;
layout(location = 2) in vec3 a_normal;
layout(location = 3) in vec4 a_color;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

out lowp vec4 v_color;

void main() {
  gl_Position = u_projection * u_view * u_model * a_position;
  v_color = a_color;
}