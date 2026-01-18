package com.bmstefanski.hytalejs;

public interface ScriptRuntime {
  void enter();

  void leave();

  void eval(String script);

  void setGlobal(String name, Object value);

  ScriptValue getGlobal(String name);
}
