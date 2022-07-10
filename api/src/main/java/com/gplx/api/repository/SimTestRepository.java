package com.gplx.api.repository;

import com.gplx.api.entity.SimTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SimTestRepository extends JpaRepository<SimTest, Integer> {
}