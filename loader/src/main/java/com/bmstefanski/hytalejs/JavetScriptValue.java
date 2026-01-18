package com.bmstefanski.hytalejs;

import com.caoccao.javet.exceptions.JavetException;
import com.caoccao.javet.interop.V8Runtime;
import com.caoccao.javet.values.V8Value;
import com.caoccao.javet.values.primitive.V8ValueString;
import com.caoccao.javet.values.reference.V8ValueArray;
import com.caoccao.javet.values.reference.V8ValueFunction;
import com.caoccao.javet.values.reference.V8ValueGlobalObject;
import com.caoccao.javet.values.reference.V8ValueObject;

public class JavetScriptValue implements ScriptValue {
  private final V8Value value;
  private final JavetScriptRuntime runtime;

  public JavetScriptValue(V8Value value) {
    this.value = value;
    V8Runtime v8Runtime = value.getV8Runtime();
    this.runtime = new JavetScriptRuntime(v8Runtime);
  }

  @Override
  public boolean isExecutable() {
    return value instanceof V8ValueFunction;
  }

  @Override
  public void executeVoid(Object... args) {
    if (value instanceof V8ValueFunction function) {
      try (V8ValueGlobalObject global = value.getV8Runtime().getGlobalObject()) {
        function.callVoid(global, args);
      } catch (JavetException e) {
        throw new RuntimeException("Failed to execute function", e);
      }
    }
  }

  @Override
  public boolean hasArrayElements() {
    return value instanceof V8ValueArray;
  }

  @Override
  public long getArraySize() {
    if (value instanceof V8ValueArray array) {
      try {
        return array.getLength();
      } catch (JavetException e) {
        throw new RuntimeException("Failed to read array length", e);
      }
    }
    return 0;
  }

  @Override
  public ScriptValue getArrayElement(long index) {
    if (value instanceof V8ValueArray array) {
      try {
        V8Value element = array.get((int) index);
        return element == null ? null : new JavetScriptValue(element);
      } catch (JavetException e) {
        throw new RuntimeException("Failed to read array element", e);
      }
    }
    return null;
  }

  @Override
  public boolean hasMember(String name) {
    if (value instanceof V8ValueObject object) {
      try {
        return object.has(name);
      } catch (JavetException e) {
        throw new RuntimeException("Failed to check member: " + name, e);
      }
    }
    return false;
  }

  @Override
  public ScriptValue getMember(String name) {
    if (value instanceof V8ValueObject object) {
      try {
        V8Value member = object.get(name);
        return member == null ? null : new JavetScriptValue(member);
      } catch (JavetException e) {
        throw new RuntimeException("Failed to read member: " + name, e);
      }
    }
    return null;
  }

  @Override
  public String asString() {
    if (value instanceof V8ValueString stringValue) {
      return stringValue.toPrimitive();
    }
    return value.toString();
  }

  @Override
  public void setMember(String name, Object value) {
    if (this.value instanceof V8ValueObject object) {
      Object raw = value instanceof ScriptValue scriptValue ? scriptValue.unwrap() : value;
      try {
        object.set(name, raw);
      } catch (JavetException e) {
        throw new RuntimeException("Failed to set member: " + name, e);
      }
    }
  }

  @Override
  public void removeMember(String name) {
    if (value instanceof V8ValueObject object) {
      try {
        object.delete(name);
      } catch (JavetException e) {
        throw new RuntimeException("Failed to remove member: " + name, e);
      }
    }
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
    try {
      value.close();
    } catch (JavetException e) {
      throw new RuntimeException("Failed to close V8 value", e);
    }
  }
}
