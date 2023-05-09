import { render, cleanup, screen } from "@testing-library/react";
import TheWarehouse from "../../components/root/users/business/Offer/TheWarehouse";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeleteWarehouseService from "../../api/Warehouse/DeleteWarehouseService";
import IsWarehouseSavedService from "../../api/Warehouse/IsWarehouseSavedService";
import mockAxios from "jest-mock-axios";

afterEach(() => {
  mockAxios.reset();
  cleanup;
});

it("should delete Warehouse successfully", async () => {
  const id = 6;

  mockAxios.delete.mockReturnValueOnce(id);

  const result = await DeleteWarehouseService(id);

  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  expect(mockAxios.delete).toHaveBeenCalledWith("/theWarehouses/6");
  expect(result).toEqual(6);
});

it("should show if Warehouse is saved successfully", async () => {
  const id = 6;

  mockAxios.get.mockReturnValueOnce("true");

  const result = await IsWarehouseSavedService(id);

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  expect(mockAxios.get).toHaveBeenCalledWith(`/theWarehouses/is-saved`, {
    params: { id: 6, username: "" },
  });
  expect(result).toEqual("true");
});
