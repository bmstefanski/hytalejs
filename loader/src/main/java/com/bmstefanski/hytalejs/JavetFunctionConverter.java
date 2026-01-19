package com.bmstefanski.hytalejs;

import com.caoccao.javet.exceptions.JavetException;
import com.caoccao.javet.interop.converters.JavetProxyConverter;
import com.caoccao.javet.values.V8Value;
import com.caoccao.javet.values.reference.V8ValueFunction;

public class JavetFunctionConverter extends JavetProxyConverter {
  @Override
  @SuppressWarnings("unchecked")
  protected <T> T toObject(V8Value v8Value, int depth) throws JavetException {
    if (v8Value instanceof V8ValueFunction) {
      return (T) v8Value;
    }
    return super.toObject(v8Value, depth);
  }
}
