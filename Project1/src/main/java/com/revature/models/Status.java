package com.revature.models;

public class Status {
	private int statusId;

	public Status() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Status(int statusId) {
		super();
		this.statusId = statusId;
	}

	public int getStatusId() {
		return statusId;
	}

	public void setStatusId(int statusId) {
		this.statusId = statusId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + statusId;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Status other = (Status) obj;
		if (statusId != other.statusId)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Status [statusId=" + statusId + "]";
	}
	
	
}
