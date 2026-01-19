package com.bmstefanski.hytalejs;

import com.caoccao.javet.exceptions.JavetException;
import com.caoccao.javet.interop.V8Runtime;
import com.caoccao.javet.values.V8Value;
import com.caoccao.javet.values.reference.V8ValueGlobalObject;

public class JavetScriptRuntime implements ScriptRuntime {
  private final V8Runtime runtime;

  public JavetScriptRuntime(V8Runtime runtime) {
    this.runtime = runtime;
  }

  public V8Runtime getRuntime() {
    return runtime;
  }

  @Override
  public void enter() {
  }

  @Override
  public void leave() {
  }

  @Override
  public void eval(String script) {
    try {
      runtime.getExecutor(script).executeVoid();
    } catch (JavetException e) {
      throw new RuntimeException("Failed to evaluate script", e);
    }
  }

  @Override
  public void setGlobal(String name, Object value) {
    Object raw = value instanceof ScriptValue scriptValue ? scriptValue.unwrap() : value;
    try (V8ValueGlobalObject global = runtime.getGlobalObject()) {
      global.set(name, raw);
    } catch (JavetException e) {
      throw new RuntimeException("Failed to set global binding: " + name, e);
    }
  }

  @Override
  public ScriptValue getGlobal(String name) {
    try (V8ValueGlobalObject global = runtime.getGlobalObject()) {
      V8Value value = global.get(name);
      return value == null ? null : new JavetScriptValue(value);
    } catch (JavetException e) {
      throw new RuntimeException("Failed to read global binding: " + name, e);
    }
  }
}
