package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.asset.common.CommonAsset;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CompletableFuture;
import javax.annotation.Nonnull;

public class ByteArrayCommonAsset extends CommonAsset {
    private final byte[] data;

    public ByteArrayCommonAsset(@Nonnull String name, @Nonnull byte[] bytes) {
        super(name, bytes);
        this.data = bytes;
    }

    public ByteArrayCommonAsset(@Nonnull String name, @Nonnull String content) {
        this(name, content.getBytes(StandardCharsets.UTF_8));
    }

    @Override
    @Nonnull
    protected CompletableFuture<byte[]> getBlob0() {
        return CompletableFuture.completedFuture(this.data);
    }

    @Override
    @Nonnull
    public String toString() {
        return "ByteArrayCommonAsset{name=" + getName() + ", hash=" + getHash() + ", size=" + this.data.length + "}";
    }
}
