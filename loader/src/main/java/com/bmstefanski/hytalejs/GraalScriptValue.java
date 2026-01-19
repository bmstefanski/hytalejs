package com.bmstefanski.hytalejs;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Value;

public class GraalScriptValue implements ScriptValue {
  private final Value value;
  private final GraalScriptRuntime runtime;

  public GraalScriptValue(Value value) {
    this.value = value;
    Context context = value.getContext();
    this.runtime = new GraalScriptRuntime(context);
  }

  @Override
  public boolean isExecutable() {
    return value.canExecute();
  }

  @Override
  public void executeVoid(Object... args) {
    if (value.canExecute()) {
      value.execute(args);
    }
  }

  @Override
  public boolean hasArrayElements() {
    return value.hasArrayElements();
  }

  @Override
  public long getArraySize() {
    return value.getArraySize();
  }

  @Override
  public ScriptValue getArrayElement(long index) {
    Value element = value.getArrayElement(index);
    return element == null ? null : new GraalScriptValue(element);
  }

  @Override
  public boolean hasMember(String name) {
    return value.hasMember(name);
  }

  @Override
  public ScriptValue getMember(String name) {
    Value member = value.getMember(name);
    return member == null ? null : new GraalScriptValue(member);
  }

  @Override
  public String asString() {
    return value.asString();
  }

  @Override
  public void setMember(String name, Object value) {
    Object raw = value instanceof ScriptValue scriptValue ? scriptValue.unwrap() : value;
    this.value.putMember(name, raw);
  }

  @Override
  public void removeMember(String name) {
    value.removeMember(name);
  }

  @Override
  public Object unwrap() {
    return value;
  }

  @Override
  public ScriptRuntime getRuntime() {
    return runtime;
  }

  @Override
  public void close() {
  }
}
