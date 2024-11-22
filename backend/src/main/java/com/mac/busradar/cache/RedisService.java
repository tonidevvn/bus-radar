package com.mac.busradar.cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RedisService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    // Add single element
    public Boolean addToZsetByTimestamp(String key) {
        return redisTemplate.opsForZSet().add(key, key, System.currentTimeMillis());
    }

    public Set<String> getElementsByRange(String key, long start, long end) {
        return redisTemplate.opsForZSet().rangeByScore(key, start, end);
    }
}
